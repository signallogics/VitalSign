int inByte = 0;         // incoming serial byte

void setup()
{
  // start serial port at 9600 bps:
  Serial.begin(19200);
//  while (!Serial) {
//    ; // wait for serial port to connect. Needed for Leonardo only
//  }

  pinMode(2, OUTPUT); 
}

void loop()
{
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    // get incoming byte:
    inByte = Serial.read();
   digitalWrite(3, HIGH); 
  } else {
    Serial.print("hi");
    digitalWrite(3, LOW);       
  }
}
