package space.habitz.api.domain.schedule.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import space.habitz.api.global.response.ResponseData;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

	@PostMapping
	public ResponseData<Integer> createSchedule(@RequestHeader String auth) {
		return ResponseData.success(1);
	}

}
