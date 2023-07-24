package com.moi.anitime.model.entity.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@SuperBuilder
@Entity(name = "sheltermember")
@NoArgsConstructor
@DiscriminatorValue("S")
@PrimaryKeyJoinColumn(name = "shelterno")
public class ShelterMember extends Member{
    private String addr;
    private String evidence;
}
