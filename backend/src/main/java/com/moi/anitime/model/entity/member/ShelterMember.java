package com.moi.anitime.model.entity.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.PrimaryKeyJoinColumn;
import java.sql.Blob;

@SuperBuilder
@Entity(name = "sheltermember")
@NoArgsConstructor
@DiscriminatorValue("S")
@PrimaryKeyJoinColumn(name = "shelterno")
@Setter
@Getter
public class ShelterMember extends Member{
    private String addr;
    private String evidence;
}
