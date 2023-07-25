package com.moi.anitime.model.entity.member;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@SuperBuilder
@Entity(name = "generalmember")
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "generalno")
@DiscriminatorValue("G")
public class GeneralMember extends Member{

    @Column(name="snscheck", columnDefinition = "TINYINT(1)")
    private boolean snsCheck;
    @Column(name="snstoken")
    private String snsToken;

    public GeneralMember(int generalno) {
        this.setMemberNo(generalno);
    }

    @Override
    public String toString() {
        return super.toString()+"snsCheck="+snsCheck+" snsToken="+snsToken;
    }
}
