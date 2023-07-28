package com.moi.anitime.model.entity.bookmark;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.member.GeneralMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmarkno")
    private int bookmarkNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generalno")
    private GeneralMember generalMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "desertionno")
    private Animal animal;
}
