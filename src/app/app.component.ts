import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as pdfjsLib from 'pdfjs-dist'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  count = signal(0);

  onIncrement(){
  // console.log(pdfjsLib);
    
    // Load PDF document
    const url = 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf';
    
    
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        // Iterate through each page
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pdf.getPage(pageNumber).then(function(page) {
                // Extract text content from the page
                page.getTextContent().then(function(textContent) {
                    // Process text content to identify chapters
                    let chapterText = "";
                    textContent.items.forEach(function(item : any) {
                        // Example: Check if text item represents a chapter heading
                        if (item.str.includes("Chapter")) {
                            // Append text to chapter content
                            chapterText += item.str + "\n";
                        }
                    });
                    
                    // Output or process chapter content
                    console.log("Chapter " + pageNumber + ":\n" + chapterText);
                });
            });
        }
    }, function(reason) {
        // Error handling
        console.error('Error loading PDF: ' + reason);
    });
  }
}
