package space.habitz.api.domain.pay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.pay.entity.ParentPayment;

@Repository
public interface ParentPaymentRepository extends JpaRepository<ParentPayment, Long> {
}
