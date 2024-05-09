package space.habitz.api.domain.quiz.controller;

import org.springframework.security.access.prepost.PreAuthorize;
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
import space.habitz.api.domain.quiz.dto.QuizHistoryDto;
import space.habitz.api.domain.quiz.dto.QuizSolveInfoDto;
import space.habitz.api.domain.quiz.service.QuizService;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@RequestMapping("/api/v1/quiz")
@RequiredArgsConstructor
@RestController
@PreAuthorize("hasAnyRole('CHILD', 'ADMIN')")
public class QuizController {

	private final QuizService quizService;

	@ApiResponse(description = "퀴즈 조회")
	@GetMapping("/today-quiz")
	@PreAuthorize("hasAnyRole('CHILD')")
	public ResponseData<QuizHistoryDto> getTodayQuiz(@AuthenticationPrincipal Member member) {
		return new ResponseData<>("success", "퀴즈 조회 성공", quizService.getTodayQuiz(member));
	}

	@ApiResponse(description = "퀴즈 풀기")
	@PostMapping("/solve-quiz")
	@PreAuthorize("hasAnyRole('CHILD')")
	public ResponseData<QuizHistoryDto> solveQuiz(@AuthenticationPrincipal Member member,
		@RequestBody QuizSolveInfoDto quizSolveInfoDto) {
		return new ResponseData<>("success", "퀴즈 풀기 성공", quizService.solveQuiz(member, quizSolveInfoDto.getAnswer()));
	}

}
