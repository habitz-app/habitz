package space.habitz.api.domain.quiz.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.quiz.dto.QuizHistoryDto;
import space.habitz.api.domain.quiz.dto.QuizSolveInfoDto;
import space.habitz.api.domain.quiz.service.QuizService;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@RequestMapping("/api/v1/quiz")
@RequiredArgsConstructor
@RestController
public class QuizController {

	private final QuizService quizService;

	@ApiResponse(description = "퀴즈 조회")
	@GetMapping("/today-quiz")
	public ResponseData<QuizHistoryDto> getTodayQuiz(@AuthenticationPrincipal Member member) {
		if (member.getRole() != Role.CHILD) {
			return new ResponseData<>("fail", "어린이만 접근 가능한 페이지입니다.", null);
		}

		return new ResponseData<>("success", "퀴즈 조회 성공", quizService.getTodayQuiz(member));

	}

	@ApiResponse(description = "퀴즈 풀기")
	@PostMapping("/solve-quiz")
	public ResponseData<QuizHistoryDto> solveQuiz(@AuthenticationPrincipal Member member,
		@RequestBody QuizSolveInfoDto quizSolveInfoDto) {
		if (member.getRole() != Role.CHILD) {
			return new ResponseData<>("fail", "어린이만 접근 가능한 페이지입니다.", null);
		}
		return new ResponseData<>("success", "퀴즈 풀기 성공", quizService.solveQuiz(member, quizSolveInfoDto.getAnswer()));
	}

}
