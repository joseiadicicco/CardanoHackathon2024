//function typeText(text: string, delay: number = 200): void {
//    let index = 0;
//
//    // Define a function to write each character with delay
//    const printNextChar = () => {
//        if (index < text.length) {
//            process.stdout.write(text[index]);  // Print the character without a newline
//            index++;
//            setTimeout(printNextChar, delay); // Call the next character after the delay
//        } else {
//            process.stdout.write('\n'); // Add a newline after typing
//        }
//    };
//
//    printNextChar(); // Start the typing effect
//}