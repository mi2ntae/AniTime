package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.animal.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface AnimalRepo extends JpaRepository<Animal, Integer> {

    @Query(value = "SELECT * FROM Animal WHERE kind LIKE :kind AND sexcd LIKE :sexcd ORDER BY :sortQuery",nativeQuery = true)
    public List<Animal> getAnimal(String kind, char sexcd, String sortQuery, Pageable curPageNo);
}
