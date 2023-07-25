package com.moi.anitime.model.entity.member;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@SuperBuilder
@Entity(name = "generalmember")
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "generalno")
@DiscriminatorValue("G")
@Setter
@Getter
public class GeneralMember extends Member{

    @Column(name="snscheck", columnDefinition = "TINYINT(1)")
    private boolean snsCheck;
    @Column(name="snstoken")
    private String snsToken;

    public GeneralMember(int generalno) {
        this.setMemberNo(generalno);
    }

}
