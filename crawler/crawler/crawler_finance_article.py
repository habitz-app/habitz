import re
import csv

import requests

from datetime import datetime
from dataclasses import dataclass, asdict
from bs4 import BeautifulSoup

import pandas as pd
from sqlalchemy import create_engine


@dataclass
class Article :
    url : str
    preview_image : str = None
    title : str = None
    category : str = None
    content : str = None
    publish_date : str = None
    writer_name : str = None
    writer_image : str = None
    source : str = None

    def to_dict(self) : 
        return asdict(self)
    
    def to_list(self):
        return list(self.__dict__.values())

def save_to_csv(articles, filename):
    import csv, os
    if not articles:
        return

    # 필드 이름
    fieldnames = articles[0].to_dict().keys()

    # 디렉터리 생성
    directory = os.path.dirname(filename)
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for article in articles:
            writer.writerow(article.to_dict())

def bulk_insert(csv_file_name) : 
    from dotenv import load_dotenv
    import os

    load_dotenv()

    mysql_name = os.getenv("MYSQL_USERNAME")
    mysql_password = os.getenv("MYSQL_PASSWORD")
    mysql_host = os.getenv("MYSQL_HOST")
    mysql_db_name = os.getenv("MYSQL_DB_NAME")

    df = pd.read_csv(csv_file_name)

    db_connection_string = f"mysql+pymysql://{mysql_name}:{mysql_password}@{mysql_host}:3306/{mysql_db_name}"
    engine = create_engine(db_connection_string)

    table_name = "article"
    df.to_sql(table_name, con = engine, if_exists = "append", index = False)
    mylogger.info("Success !! Insert csv file !!! ")


def convert_string_to_date(date_string: str) -> datetime:
    if not date_string:
        return None  # 유효하지 않은 날짜 문자열인 경우 None 반환
    try:
        return datetime.strptime(date_string, '%Y-%m-%d').date()
    except ValueError as e:
        print(f"Error converting date: {e}")
        return None  # 유효하지 않은 날짜 문자열인 경우 None 반환


def econoi_page_cralwer(page, category) -> list :
    """
    어린이 경제 신문 크롤러
    """
    base_url = "https://www.econoi.com/"
    url = f"https://www.econoi.com/news/articleList.html?page={page}&sc_sub_section_code={category[0]}&view_type=sm"

    response = requests.get(url)
    print(url)


    if response.status_code == "400":
        return 

    soup = BeautifulSoup(response.text, "html.parser")

    # Page 별 추출 할 아티클
    article_list = []

    thumb_items = soup.find_all("a", class_ = "thumb")
    if not thumb_items:
        return article_list

    for item in thumb_items:
        article_url = base_url + item.get("href") # 링크 
        preview_image = item.find("img").get("src")

        date_tag = soup.find('em', class_='replace-date')
        date_text = date_tag.get_text(strip=True) if date_tag else None
        
        # 날짜가 유효한 경우에만 비교 수행
        article_date = convert_string_to_date(date_text)
        if article_date is not None and article_date < convert_string_to_date('2022-12-31'):
            return article_list

        article_list.append(Article(url = article_url, preview_image= preview_image, category = category[1], source = "어린이 경제 신문", publish_date = date_text))
    return article_list


def econoi_detail_cralwer(article) -> Article:

    # 한 페이지에 대한 기사 크롤링 -> async
    response = requests.get(article.url)
    response.raise_for_status()

    if response.status_code == "400" :
        return None

    soup = BeautifulSoup(response.text, "html.parser")
    
    # 기사 제목 추출
    title_tag = soup.find("h1", class_ = "heading")
    title = title_tag.get_text(strip=True) if title_tag else None
    
    """
    html / content : 일단 text 만 추출한다.
    """
    # 기사 내용 추출
    content = ""
    content_tag = soup.find("article", class_ = "article-veiw-body")
    if content_tag :
        for paragrah in content_tag.find_all("p") :
            content += paragrah.get_text(strip = True) + "\n"

    # 기사 작성자 찾기
    writer_tag = soup.find("article", class_="writer")

    writer_name_tag = writer_tag.find("strong", class_="name") if writer_tag else None
    writer_name = writer_name_tag.get_text(strip=True) if writer_name_tag else None

    writer_image_tag = writer_tag.find("em", class_="image-inner").get('style') if writer_tag else None
    writer_image_url_parse = re.search(r"url\((.*?)\)", writer_image_tag) if writer_image_tag else None
    writer_image_url = writer_image_url_parse.group(1).strip("'") if writer_image_url_parse else None


    # 데이터 입력
    article.title = title if title else None
    article.content = content
    article.writer_image = writer_image_url if writer_image_url else None
    article.writer_name = writer_name if writer_name else None
    
    if article.title is None :
        return None
    mylogger.info(f"{article.title} :: {article.publish_date}")
    return article



def econoi_crawler() -> list:
    mylogger.info("Start_경제 기사 크롤링!! ")
    categories = [("S2N1", "LIFE"), ("S2N2", "DEFAULT"), ("S2N25", "FINANCE"), ("S2N26", "LIFE")]

    total_article_list = []
    for category in categories : 
        mylogger.info(f"Change the category !!! {category[0]}")
        page = 1
        while True : 
            mylogger.info(f"Next Page  =================== {page} Pages.")
            page_article_list = econoi_page_cralwer(page, category)
            if len(page_article_list) == 0 or not page_article_list:
                break 

            detailed_article_list = []
            for article in page_article_list :
                detailed_article = econoi_detail_cralwer(article) 
                if detailed_article :
                    detailed_article_list.append(detailed_article)
        
            if not detailed_article_list :
                break

            total_article_list.extend(detailed_article_list)
            page+=1

    mylogger.info("End --- All the targets.")
    return total_article_list

if __name__ == "__main__" :

    import logging
    now = datetime.now()
    today = now.strftime('%Y-%m-%d')

    # Logger
    # Logger 설정
    mylogger = logging.getLogger(today)
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    
    mylogger.setLevel(logging.INFO)
    mylogger.addHandler(stream_handler)

    total_article_list = econoi_crawler()
    print(len(total_article_list))

    print("====================================")
    csv_file_path = f"../data/econoi_article_{today}.csv"
    save_to_csv(total_article_list, csv_file_path)
    mylogger.info("SAVED !!! ")
    print("====================================")
    bulk_insert(csv_file_path)




