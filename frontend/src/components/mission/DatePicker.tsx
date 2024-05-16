'use client';
import { IonIcon } from '@ionic/react';
import {
  chevronBackOutline,
  chevronForwardOutline,
  calendarClearOutline,
} from 'ionicons/icons';
import { Button } from '~/components/ui/button';
import * as DP from '~/components/ui/date-picker';
import { IconButton } from '~/components/ui/icon-button';
import { Input } from '~/components/ui/input';
import { Dispatch } from 'react';
import { css } from 'styled-system/css';

export const DatePicker = ({
  date,
  setDate,
  ...props
}: {
  date: string[];
  setDate: Dispatch<React.SetStateAction<string[]>>;
  props?: DP.RootProps;
}) => {
  return (
    <DP.Root
      positioning={{ sameWidth: true }}
      startOfWeek={1}
      selectionMode="range"
      width="full"
      {...props}
      defaultValue={date}
      onValueChange={(value) => {
        console.log(value);
        setDate(value.valueAsString);
      }}
    >
      <DP.Label className={css({ textStyle: 'title3.bold' })}>일정</DP.Label>
      <DP.Control>
        <DP.Input index={0} asChild>
          <Input />
        </DP.Input>
        <DP.Input index={1} asChild>
          <Input />
        </DP.Input>
        <DP.Trigger asChild>
          <IconButton variant="outline" aria-label="Open date picker">
            <IonIcon icon={calendarClearOutline} />
          </IconButton>
        </DP.Trigger>
      </DP.Control>
      <DP.Positioner>
        <DP.Content>
          <DP.View view="day">
            {(api) => (
              <>
                <DP.ViewControl>
                  <DP.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <IonIcon icon={chevronBackOutline} />
                    </IconButton>
                  </DP.PrevTrigger>
                  <DP.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DP.RangeText />
                    </Button>
                  </DP.ViewTrigger>
                  <DP.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <IonIcon icon={chevronForwardOutline} />
                    </IconButton>
                  </DP.NextTrigger>
                </DP.ViewControl>
                <DP.Table>
                  <DP.TableHead>
                    <DP.TableRow>
                      {api.weekDays.map((weekDay, id) => (
                        <DP.TableHeader key={id}>
                          {weekDay.narrow}
                        </DP.TableHeader>
                      ))}
                    </DP.TableRow>
                  </DP.TableHead>
                  <DP.TableBody>
                    {api.weeks.map((week, id) => (
                      <DP.TableRow key={id}>
                        {week.map((day, id) => (
                          <DP.TableCell key={id} value={day}>
                            <DP.TableCellTrigger asChild>
                              <IconButton variant="ghost">{day.day}</IconButton>
                            </DP.TableCellTrigger>
                          </DP.TableCell>
                        ))}
                      </DP.TableRow>
                    ))}
                  </DP.TableBody>
                </DP.Table>
              </>
            )}
          </DP.View>
          <DP.View view="month">
            {(api) => (
              <>
                <DP.ViewControl>
                  <DP.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <IonIcon icon={chevronBackOutline} />
                    </IconButton>
                  </DP.PrevTrigger>
                  <DP.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DP.RangeText />
                    </Button>
                  </DP.ViewTrigger>
                  <DP.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <IonIcon icon={chevronForwardOutline} />
                    </IconButton>
                  </DP.NextTrigger>
                </DP.ViewControl>
                <DP.Table>
                  <DP.TableBody>
                    {api
                      .getMonthsGrid({ columns: 4, format: 'short' })
                      .map((months, id) => (
                        <DP.TableRow key={id}>
                          {months.map((month, id) => (
                            <DP.TableCell key={id} value={month.value}>
                              <DP.TableCellTrigger asChild>
                                <Button variant="ghost">{month.label}</Button>
                              </DP.TableCellTrigger>
                            </DP.TableCell>
                          ))}
                        </DP.TableRow>
                      ))}
                  </DP.TableBody>
                </DP.Table>
              </>
            )}
          </DP.View>
          <DP.View view="year">
            {(api) => (
              <>
                <DP.ViewControl>
                  <DP.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <IonIcon icon={chevronBackOutline} />
                    </IconButton>
                  </DP.PrevTrigger>
                  <DP.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DP.RangeText />
                    </Button>
                  </DP.ViewTrigger>
                  <DP.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <IonIcon icon={chevronForwardOutline} />
                    </IconButton>
                  </DP.NextTrigger>
                </DP.ViewControl>
                <DP.Table>
                  <DP.TableBody>
                    {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                      <DP.TableRow key={id}>
                        {years.map((year, id) => (
                          <DP.TableCell key={id} value={year.value}>
                            <DP.TableCellTrigger asChild>
                              <Button variant="ghost">{year.label}</Button>
                            </DP.TableCellTrigger>
                          </DP.TableCell>
                        ))}
                      </DP.TableRow>
                    ))}
                  </DP.TableBody>
                </DP.Table>
              </>
            )}
          </DP.View>
        </DP.Content>
      </DP.Positioner>
    </DP.Root>
  );
};
export default DatePicker;
