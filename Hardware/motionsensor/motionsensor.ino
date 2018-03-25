#define NUM_SAMPLES 100

const int pingPin = 7;
int i = 0;
int sum = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Hello!");
}

void loop() {
  long duration, inches, cm;
  long measurements[NUM_SAMPLES];
  
  pinMode(pingPin, OUTPUT);
  digitalWrite(pingPin, LOW);
  delayMicroseconds(2);
  digitalWrite(pingPin, HIGH);
  delayMicroseconds(5);
  digitalWrite(pingPin, LOW);

  pinMode(pingPin, INPUT);
  duration = pulseIn(pingPin, HIGH);

  measurements[i] = microsecondsToInches(duration);
  i++;
  if(i == NUM_SAMPLES) {
    sum = 0;
    for(i = 0; i < NUM_SAMPLES; i++) {
      sum += measurements[i];
    }
    inches = sum/NUM_SAMPLES;

    Serial.print(inches);
    Serial.print("in, ");
    Serial.print(i);
    //Serial.print(cm);
    //Serial.print("cm");
    Serial.println();
    i = 0;
  }
  delay(10);
}

long microsecondsToInches(long microseconds) {
  return microseconds / 74 / 2;
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
