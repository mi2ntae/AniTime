package com.moi.anitime.model.entity.member;

import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import java.sql.Blob;

@SuperBuilder
@Entity(name = "sheltermember")
@NoArgsConstructor
@DiscriminatorValue("S")
@PrimaryKeyJoinColumn(name = "shelterno")
public class ShelterMember extends Member{
    private String addr;
    private Blob evidence;
}
