package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Profile;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.service.ProfileService;
import ru.kata.spring.boot_security.demo.service.RoleService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminRestController {

    private final ProfileService profileService;
    private final RoleService roleService;

    @GetMapping()
    public ResponseEntity<List<Profile>> showAllUsers(){
        return new ResponseEntity<>(profileService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> showUneUser(@PathVariable("id") Long id) {
        return new ResponseEntity<Profile>(profileService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Void> createProfile(@Valid @RequestBody Profile profile) {
        profileService.saveProfile(profile);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/patch")
    public ResponseEntity<Void> updateProfile(@Valid @RequestBody Profile profile) {
        profileService.saveProfile(profile);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable("id") Long id) {
        profileService.deleteProfile(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

//    @GetMapping("/header")
//    public ResponseEntity<Profile> getAuth(Principal principal) {
//        Profile profile = profileService.getUserByName(principal.getName());
//        return new ResponseEntity<>(profile, HttpStatus.OK);
//    }
}
