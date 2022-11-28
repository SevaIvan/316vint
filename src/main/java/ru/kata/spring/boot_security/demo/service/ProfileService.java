package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.entity.Profile;
import ru.kata.spring.boot_security.demo.repo.ProfileRepo;
import ru.kata.spring.boot_security.demo.repo.RoleRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService implements UserDetailsService {

    @Autowired
    private ProfileRepo profileRepo;

    @Autowired
    private RoleRepo roleRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return profileRepo.getProfilesByLogin(username);
    }

    public Profile getUserByName(String name){
        return profileRepo.getProfilesByLogin(name);
    }

    public List<Profile> getAllUsers() {
        return profileRepo.findAll();
    }

    public Optional<Profile> getUserById(Long id) {
        return profileRepo.findById(id);
    }

    public void saveProfile(Profile profile) {
        profileRepo.save(profile);
    }

    public void updateProfile(Profile profile) {
        profileRepo.save(profile);
    }

    public void deleteProfile(Long id) {
        profileRepo.deleteById(id);
    }
}
