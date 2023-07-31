package com.moi.anitime.model.entity.donation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "donation")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donationno")
    private int donationNo;             // Int  NOT NULL AUTO_INCREMENT PRIMARY key,
    @Column(name = "boardno")
    private int boardNo;                // Int  NOT NULL,
    @Column(name = "generalno")
    private int generalNo;              // Int  NOT NULL,
    @Column(name = "donateamount")
    private int donateAmount;           // Int  NULL,
    @Column(name = "donatedate")
    private LocalDateTime donateDate;   // datetime NULL
}
