'use client';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { hstack, stack } from 'styled-system/patterns';
import { Button } from '~/components/ui/button';
import * as DatePicker from '~/components/ui/date-picker';
import { IconButton } from '~/components/ui/icon-button';
import { colors } from './colors';

// 달력 조회 시 아이의 일정 조회 API Response
interface calendarChildInfo {
  month: string;
  childInfo: string[];
  days: {
    [key: string]: boolean[];
  };
}

// Props 데이터 구조
interface CalendarProps extends DatePicker.RootProps {
  data: calendarChildInfo;
  selectDate: (date: string) => void;
}

export default function Calendar({
  data,
  selectDate,
  ...props
}: CalendarProps) {
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
    childrenBoolean,
  }: {
    childrenBoolean: boolean[];
  }) => {
    if (childrenBoolean) {
      return (
        <div
          className={hstack({
            gap: 1,
            position: 'relative',
          })}
        >
          {childrenBoolean.map((child, id) => {
            if (child) {
              return <ChildDot key={id} color={colors[id]} />;
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
      closeOnSelect={false}
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
                                    childrenBoolean={
                                      data.days[
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
                  {api
                    .getMonthsGrid({ columns: 4, format: 'short' })
                    .map((months, id) => (
                      <DatePicker.TableRow key={id}>
                        {months.map((month, id) => (
                          <DatePicker.TableCell key={id} value={month.value}>
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
                        <DatePicker.TableCell key={id} value={year.value}>
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
