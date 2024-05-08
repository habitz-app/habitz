package space.habitz.api.domain.pay.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.pay.dto.PayConfirmDto;
import space.habitz.api.domain.pay.dto.PayInfoDto;
import space.habitz.api.domain.pay.entity.ParentPayment;
import space.habitz.api.domain.pay.entity.PayStatus;
import space.habitz.api.domain.pay.repository.ParentPaymentRepository;
import space.habitz.api.domain.point.entity.FamilyPointHistory;
import space.habitz.api.domain.point.repository.FamilyPointHistoryRepository;

@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService {

	private final ParentPaymentRepository parentPaymentRepository;
	private final FamilyPointHistoryRepository familyPointHistoryRepository;
	private final FamilyRepository familyRepository;

	@Override
	public PayInfoDto getOrderId(Member member, int amount) {

		String orderId = "H" + LocalDateTime.now()
			.toString()
			.replace("-", "")
			.replace(":", "")
			.replace(" ", "")
			.replace(".", "")
			.replace("T", "") + member.getUuid();
		ParentPayment parentPayment = ParentPayment.builder()
			.member(member)
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

	@Override
	@Transactional
	public String confirmPay(PayConfirmDto payConfirmDto) {

		ParentPayment parentPayment = parentPaymentRepository.findByOrderId(payConfirmDto.getOrderId())
			.orElseThrow(() -> new IllegalArgumentException("주문 ID가 존재하지 않습니다."));

		parentPayment.updatePayStatus(payConfirmDto.getStatus(), payConfirmDto.getPaymentKey(),
			Timestamp.valueOf(LocalDateTime.now()));

		if (!parentPayment.getResult().equals(PayStatus.DONE)) {
			parentPaymentRepository.save(parentPayment);
			return "결제가 실패하였습니다.";
		}

		parentPaymentRepository.save(parentPayment);

		Family family = familyRepository.findFamilyById(parentPayment.getMember().getFamily().getId());
		family.addFamilyPoint(parentPayment.getAmount());

		FamilyPointHistory familyPointHistory = FamilyPointHistory.builder()
			.parentPayment(parentPayment)
			.payPoint(parentPayment.getAmount())
			.remainPoint(family.getFamilyPoint())
			.build();
		familyPointHistoryRepository.save(familyPointHistory);

		return "결제가 완료되었습니다.";

	}
}

