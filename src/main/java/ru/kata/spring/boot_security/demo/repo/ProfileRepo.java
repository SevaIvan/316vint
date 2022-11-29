package ru.kata.spring.boot_security.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entity.Profile;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Long> {
    public Profile getProfilesByLogin(String username);

    public Profile getProfileById(Long id);

}
