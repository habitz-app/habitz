'use client';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { hstack, stack } from 'styled-system/patterns';
import { Button } from '~/components/ui/button';
import * as DatePicker from '~/components/ui/date-picker';
import { IconButton } from '~/components/ui/icon-button';
import { colors } from '@/app/(parent)/manage/calendar/colors';
import { CalendarResponse } from '@/types/api/response';
import { set } from 'react-hook-form';

// 달력 조회 시 아이의 일정 조회 API Response 데이터 구조
interface childInfo {
  name: string;
  memberUUID: string;
}

// Props 데이터 구조
interface CalendarProps extends DatePicker.RootProps {
  data: CalendarResponse;
  selectedDate: string;
  selectDate: (date: string) => void;
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

export default function Calendar({
  data,
  selectedDate,
  selectDate,
  year,
  month,
  setYear,
  setMonth,
  ...props
}: CalendarProps) {
  const createChildrenInfoByDate = (data: CalendarResponse) => {
    const childrenInfoByDate: {
      [key: string]: childInfo[];
    } = {};
    const childrenPersonalColors: {
      [key: string]: string;
    } = {};

    data.calendar.forEach((item, index) => {
      childrenPersonalColors[item.child.memberUUID] = colors[index];
      item.days.forEach((day) => {
        childrenInfoByDate[day] = childrenInfoByDate[day] || [];
        childrenInfoByDate[day].push(item.child);
      });
    });
    return {
      childrenInfoByDate: childrenInfoByDate,
      childrenPersonalColors: childrenPersonalColors,
    };
  };
  const { childrenInfoByDate, childrenPersonalColors } =
    createChildrenInfoByDate(data);

  const dateToKey = ({
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  }) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  // 캘린더에 날짜별로 아이의 일정을 표시하는 컴포넌트입니다
  const ChildDot = ({ color }: { color: string }) => (
    <div
      className={css({
        bg: color,
        w: '4px',
        h: '4px',
        rounded: '9999px',
      })}
      style={{ background: color }}
    ></div>
  );
  const ChildrenDots = ({
    childrenInfoByDate,
  }: {
    childrenInfoByDate: childInfo[];
  }) => {
    if (childrenInfoByDate) {
      return (
        <div
          className={hstack({
            gap: 1,
            position: 'relative',
          })}
        >
          {childrenInfoByDate.map((child, id) => {
            if (child) {
              return (
                <ChildDot
                  key={id}
                  color={childrenPersonalColors[child.memberUUID]}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <DatePicker.Root
      positioning={{ sameWidth: true }}
      startOfWeek={1}
      selectionMode="single"
      open={true}
      onValueChange={(value) => {
        console.log('?!');
        console.table(value);
      }}
      onViewChange={(view) => {
        console.log('view');
        console.log(view);
      }}
      closeOnSelect={false}
      value={[selectedDate]}
      {...props}
      className={css({ width: 'full' })}
    >
      <DatePicker.Content
        className={css({
          width: 'full',
          px: '5%',
          my: '5%',
          shadow: 'none',
          position: 'relative',
        })}
      >
        <DatePicker.View view="day">
          {(api) => (
            <>
              <DatePicker.ViewControl
                className={css({ justifyContent: 'center' })}
              >
                <DatePicker.PrevTrigger
                  asChild
                  onClick={() => {
                    console.log('prev');
                    if (month === 1) {
                      setYear(year - 1);
                      setMonth(12);
                    } else {
                      setMonth(month - 1);
                    }
                  }}
                >
                  <IconButton variant="ghost" size="sm">
                    <IonIcon icon={chevronBackOutline}></IonIcon>
                  </IconButton>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DatePicker.RangeText />
                  </Button>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger
                  asChild
                  onClick={() => {
                    console.log('next');
                    if (month === 12) {
                      setYear(year + 1);
                      setMonth(1);
                    } else {
                      setMonth(month + 1);
                    }
                  }}
                >
                  <IconButton variant="ghost" size="sm">
                    <IonIcon icon={chevronForwardOutline}></IonIcon>
                  </IconButton>
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {api.weekDays.map((weekDay, id) => (
                      <DatePicker.TableHeader key={id}>
                        {weekDay.narrow}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {api.weeks.map((week, id) => (
                    <DatePicker.TableRow key={id}>
                      {week.map((day, id) => (
                        <DatePicker.TableCell key={id} value={day}>
                          <DatePicker.TableCellTrigger
                            asChild
                            className={css({
                              width: '1px',
                            })}
                            onClick={() => {
                              console.table(day);
                              selectDate(dateToKey(day));
                            }}
                          >
                            <IconButton
                              variant="ghost"
                              className={css({
                                display: 'relative',
                                rounded: '9999px',
                                _selected: {
                                  bg: 'lime.400',
                                  color: 'white',
                                },
                              })}
                            >
                              <div
                                className={stack({
                                  position: 'relative',
                                  align: 'center',
                                })}
                              >
                                {day.day}
                                <div
                                  className={hstack({
                                    position: 'absolute',
                                    bottom: '-1px',
                                    gap: 1,
                                  })}
                                >
                                  <ChildrenDots
                                    childrenInfoByDate={
                                      childrenInfoByDate[
                                        dateToKey({
                                          year: day.year,
                                          month: day.month,
                                          day: day.day,
                                        })
                                      ]
                                    }
                                  ></ChildrenDots>
                                </div>
                              </div>
                            </IconButton>
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.View>
        <DatePicker.View view="month">
          {(api) => (
            <>
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger
                  asChild
                  onClick={() => {
                    console.log('monthView prev');
                    setYear(year - 1);
                  }}
                >
                  <IconButton variant="ghost" size="sm">
                    <IonIcon icon={chevronBackOutline}></IonIcon>
                  </IconButton>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DatePicker.RangeText />
                  </Button>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger
                  asChild
                  onClick={() => {
                    console.log('monthView next');
                    setYear(year + 1);
                  }}
                >
                  <IconButton variant="ghost" size="sm">
                    <IonIcon icon={chevronForwardOutline}></IonIcon>
                  </IconButton>
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableBody>
                  {api
                    .getMonthsGrid({ columns: 4, format: 'short' })
                    .map((months, id) => (
                      <DatePicker.TableRow key={id}>
                        {months.map((month, id) => (
                          <DatePicker.TableCell
                            key={id}
                            value={month.value}
                            onClick={() => {
                              console.log('monthCell:', month.value);
                              setMonth(month.value);
                            }}
                          >
                            <DatePicker.TableCellTrigger asChild>
                              <Button variant="ghost">{month.label}</Button>
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.View>
        <DatePicker.View view="year">
          {(api) => (
            <>
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger asChild>
                  <IconButton variant="ghost" size="sm">
                    <IonIcon icon={chevronBackOutline}></IonIcon>
                  </IconButton>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DatePicker.RangeText />
                  </Button>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger asChild>
                  <IconButton variant="ghost" size="sm">
                    <IonIcon icon={chevronForwardOutline}></IonIcon>
                  </IconButton>
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableBody>
                  {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                    <DatePicker.TableRow key={id}>
                      {years.map((year, id) => (
                        <DatePicker.TableCell
                          key={id}
                          value={year.value}
                          onClick={() => {
                            console.log('yearCell:', year.value);
                            setYear(year.value);
                          }}
                        >
                          <DatePicker.TableCellTrigger asChild>
                            <Button variant="ghost">{year.label}</Button>
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
