import { SharedService } from 'src/app/Shared/_services/shared.service';
import { MessageService } from './../../Shared/_services/message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css'],
})
export class VoiceRecognitionComponent {
  transcript: string = '';
  recognition: any;
  listening: boolean = false;
  constructor(
    private message: MessageService,
    private sharedService: SharedService
  ) {}
  ngOnInit() {
    // Initialize SpeechRecognition
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    // Event listener for result
    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      this.transcript = result[0].transcript;
    };

    // Event listener for end
    this.recognition.onend = () => {
      if (this.listening) {
        // Restart recognition if still listening
        this.recognition.start();
      }
    };

    // Event listener for audio end
    this.recognition.onaudioend = () => {
      // Stop recognition when there's no audio input
      this.stopListening();
    };
    // start
    this.startListening();
  }

  startListening() {
    this.transcript = 'I am Listening'; // Clear previous transcripts
    this.recognition.start();
    this.listening = true;
    // Automatically stop listening after 5 seconds
    setTimeout(() => {
      this.stopListening();
    }, 5000);
  }

  stopListening() {
    this.recognition.stop();
    this.listening = false;
    if (this.transcript === 'I am Listening') {
      this.transcript = 'I am Listening stoped';
    } else {
      this.message.setmessage(this.transcript);
      this.trigervoice();
    }
  }
  private trigervoice() {
    this.sharedService.triggerFunctionvoice();
  }
}
