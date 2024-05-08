package space.habitz.api.domain.pay.dto;

import lombok.Getter;
import space.habitz.api.domain.pay.entity.PayStatus;

@Getter
public class PayConfirmDto {
	String orderId;
	String paymentId;
	int amount;
	PayStatus status;
}
