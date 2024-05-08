package space.habitz.api.domain.pay.service;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.pay.dto.PayConfirmDto;
import space.habitz.api.domain.pay.dto.PayInfoDto;

public interface PayService {
	PayInfoDto getOrderId(Member member, int amount);

	String confirmPay(PayConfirmDto payConfirmDto);
}
