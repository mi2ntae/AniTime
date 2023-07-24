package com.moi.anitime.model.entity.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
@DiscriminatorColumn(name="DTYPE")
@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn // 하위 테이블의 구분 컬럼 생성(default = DTYPE)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberno")
    private int memberNo;
    private String email;
    private String password;
    @Column(name = "memberkind")
    private int memberKind;
    private String phone;
    private String name;
}
