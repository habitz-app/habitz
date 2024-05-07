package space.habitz.api.domain.pay.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.pay.dto.PayInfoDto;
import space.habitz.api.domain.pay.entity.ParentPayment;
import space.habitz.api.domain.pay.entity.PayStatus;
import space.habitz.api.domain.pay.repository.ParentPaymentRepository;

@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService {

	private final ParentPaymentRepository parentPaymentRepository;

	@Override
	public PayInfoDto getOrderId(Member member, int amount) {

		String orderId = "H" + LocalDateTime.now().toString().replace("-","").replace(":", "").replace(" ", "").replace(".", "").replace("T", "") + member.getUuid();
		ParentPayment parentPayment = ParentPayment.builder()
			.orderId(orderId)
			.amount(amount)
			.result(PayStatus.PENDING)
			.build();
		parentPaymentRepository.save(parentPayment);

		return PayInfoDto.builder()
			.orderId(parentPayment.getOrderId())
			.amount(parentPayment.getAmount())
			.memberUuid(member.getUuid())
			.build();
	}
}
