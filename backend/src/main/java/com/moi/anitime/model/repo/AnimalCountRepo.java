package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.animal.AnimalCount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalCountRepo extends JpaRepository<AnimalCount, Long> {

}
