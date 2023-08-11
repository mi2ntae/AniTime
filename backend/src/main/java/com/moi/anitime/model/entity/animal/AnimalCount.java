package com.moi.anitime.model.entity.animal;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity(name = "visualizermap")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class AnimalCount {

    @Id
    @Column(name = "mapcd")
    int mapCd;
    @Column(name = "mapname")
    String mapName;

    @Column(name="entrynumber")
    int entryNumber;
}
