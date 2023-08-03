package com.moi.anitime.model.repo;

import com.moi.anitime.model.entity.adoptionForm.AdoptionForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdoptionFormRepo extends JpaRepository<AdoptionForm, Integer> {
    public Optional<AdoptionForm> findAdoptionFormByMeeting_MeetNo(@Param("meetno") int meetNo);
}