package com.moi.anitime.model.entity.adoptionForm;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.meeting.Meeting;
import com.moi.anitime.model.entity.member.Member;
import lombok.*;

import javax.persistence.*;


@Entity(name = "adoptionform")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class AdoptionForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "formno")
    private int formNo;
    @OneToOne
    @JoinColumn(name = "meetno")
    private Meeting meeting;
    private String image;

}
