package space.habitz.api.domain.pay.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.pay.dto.AmountInfo;
import space.habitz.api.domain.pay.dto.PayConfirmDto;
import space.habitz.api.domain.pay.dto.PayInfoDto;
import space.habitz.api.domain.pay.service.PayService;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@RestController
@RequestMapping("/api/v1/pay")
@RequiredArgsConstructor
public class PayController {

	private final PayService payService;

	@PostMapping("/get-order-id")
	public ResponseData<PayInfoDto> getOrderId(@AuthenticationPrincipal Member member,
		@RequestBody AmountInfo amount) {
		return new ResponseData<>("success", "주문 ID 조회 성공", payService.getOrderId(member, amount.getAmount()));
	}

	@PostMapping("/confirm")
	public ResponseData<String> pay(@AuthenticationPrincipal Member member, @RequestBody PayConfirmDto payConfirmDto) {
		return new ResponseData<>("success", "결제 로직 완료", payService.confirmPay(payConfirmDto));
	}

}
