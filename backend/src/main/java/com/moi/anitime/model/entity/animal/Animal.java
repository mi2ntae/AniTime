package com.moi.anitime.model.entity.animal;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.chat.ChatRoomListRes;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "getAnimal",
                query = "SELECT A.desertionNo," +
                        "SUBSTRING(A.kind," +
                        "INSTR(A.kind, '[') + 1," +
                        "INSTR(A.kind, ']') - INSTR(A.kind, '[') - 1) AS category," +
                        "SUBSTRING(A.kind, INSTR(A.kind, ']') + 2) AS detailKind,A.sexcd,A.processState,A.image1 AS thumbnail," +
                        "IF(B.bookmarkNo IS NOT NULL,1,0) AS isBookmarked FROM Animal AS A " +
                        "LEFT JOIN Bookmark AS B ON A.desertionNo=B.desertionNo AND B.generalNo=:generalNo " +
                        "WHERE A.kind LIKE :kind AND A.sexcd LIKE :sexcd ORDER BY :sortQuery",
                resultSetMapping = "getAnimal"
        )

})
@SqlResultSetMapping(
        name = "getAnimal",
        classes = @ConstructorResult(
                targetClass = AnimalPreviewRes.class,
                columns = {
                        @ColumnResult(name = "desertionNo", type = Long.class),
                        @ColumnResult(name = "category", type = String.class),
                        @ColumnResult(name = "detailKind", type = String.class),
                        @ColumnResult(name = "sexcd", type = Character.class),
                        @ColumnResult(name = "processState", type = String.class),
                        @ColumnResult(name = "thumbnail", type = String.class),
                        @ColumnResult(name = "isBookmarked", type = Boolean.class)
                }
        )
)
public class Animal {
    @Id
    @Column(name = "desertionno")
    long desertionNo;
    @Column(name = "shelterno")
    int shelterNo;

    @Column(name="finddate")
    LocalDate findDate;

    @Column(name="findplace")
    String findPlace;
    String kind;
    String color;
    char sexcd;
    int age;
    float weight;
    @Column(name="specialmark")
    String specialMark;
    char neutral;
    @Column(name="noticeno")
    String noticeNo;

    @Column(name="noticesdate")
    LocalDate noticeSdate;
    @Column(name="noticeedate")
    LocalDate noticeEdate;
    String image1;
    String image2;
    @Column(name="processstate")
    String processState;
    float lat;
    float lon;

    public Animal(long desertionNo, LocalDate findDate, String findPlace, String kind, String color, char sexcd, int age, float weight, String specialMark, char neutral, String noticeNo, LocalDate noticeSdate, LocalDate noticeEdate, String processState,String image1, String image2) {
        this.desertionNo = desertionNo;
        this.findDate = findDate;
        this.findPlace = findPlace;
        this.processState = processState;
        this.kind = kind;
        this.color = color;
        this.sexcd = sexcd;
        this.age = age;
        this.weight = weight;
        this.specialMark = specialMark;
        this.neutral = neutral;
        this.noticeNo = noticeNo;
        this.noticeSdate = noticeSdate;
        this.noticeEdate = noticeEdate;
        this.image1 = image1;
        this.image2 = image2;
    }
}
