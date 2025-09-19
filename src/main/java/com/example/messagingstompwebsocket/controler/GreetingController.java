package com.example.messagingstompwebsocket.controler;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.messagingstompwebsocket.dto.Greeting;
import com.example.messagingstompwebsocket.dto.Message;

@Controller
public class GreetingController {
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(Message message) throws InterruptedException {
        // Thread.sleep(1000);
        return new Greeting(message.name()+": "+ message.message());
    }
}