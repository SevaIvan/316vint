package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.entity.Profile;
import ru.kata.spring.boot_security.demo.service.ProfileService;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserRestController {

    private final ProfileService profileService;

//    @GetMapping("/principal")
//    public ResponseEntity<Profile> showProfile(Principal principal) {
//        return new ResponseEntity<>(profileService.getUserByName(principal.getName()), HttpStatus.OK);
//    }
}
