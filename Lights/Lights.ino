int inByte = 0;         // incoming serial byte
int LED = 0;

void setup()
{
  // start serial port at 9600 bps:
  Serial.begin(19200);
  pinMode(LED, OUTPUT); 
}

void loop()
{
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    // get incoming byte:
    //inByte = 
    Serial.read();
    Serial.println("yes");
    digitalWrite(LED, LOW); 
  } else {
    digitalWrite(LED, HIGH);
     Serial.println("no");    
  }
  delay(100);
}
