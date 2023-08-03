package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.adoptionForm.AdoptionForm;
import com.moi.anitime.model.entity.meeting.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionFormRepo extends JpaRepository<AdoptionForm, Integer> {
}