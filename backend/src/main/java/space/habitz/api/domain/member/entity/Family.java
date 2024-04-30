package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family")
public class Family extends MutableTimeEntity {

    @Id
    @Column(name = "family_id", length = 10)
    private String id;

    @Column(name = "family_point")
    private Long familyPoint;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "family")
    private List<Member> memberList;

    public Family(String id, Long familyPoint) {
        this.id = id;
        this.familyPoint = familyPoint;
    }
}
