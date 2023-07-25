package com.moi.anitime.model.entity.profile;

import com.moi.anitime.model.entity.member.GeneralMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profileno")
    private int profileNo;

    @ManyToOne
    @JoinColumn(name = "generalno")
    private GeneralMember generalMember;

    @Column(name = "profilename")
    private String profileName;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "profilekind", columnDefinition = "tinyint")
    private ProfileKind profileKind;

    @Column(name = "detailkind")
    private String detailKind;

    @Column(name = "sexcode", columnDefinition = "char")
    @Enumerated(EnumType.STRING)
    private SexCode sexCode;

    @Column(name = "profileage")
    private int profileAge;

    @Column(name = "specialmark")
    private String specialMark;

    @Column(name = "dateat")
    private LocalDate dateAt;

    @Column(name = "profilelocation")
    private String profileLocation;

    private float lat;

    private float lon;

    private String image;

}
