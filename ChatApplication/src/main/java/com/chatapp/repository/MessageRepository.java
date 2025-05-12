package com.chatapp.repository;

import com.chatapp.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiver(String receiver); // To get messages for a user
}

