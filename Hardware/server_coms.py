import serial, requests

port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=3.0)
url = "http://se329-webagjscripts.ece.iastate.edu:3000/sensor"
occupied = False
sensor_id = 42 #arbitrary

def update():
	r = requests.put(url, params={"id" : sensor_id, "status" : occupied})
	print(r.status_code)

while(True):
	s = port.readline()
	# 'in' denotes a measurement of inches from the arduino ping sensor
	if "in" in str(s):
		dist = int(s.split()[0])
		#print(i)
	if occupied and (dist < 30):
		print("Car left")
		occupied = False
		update()
	elif (not occupied) and (dist > 30):
		print("Car entered")
		occupied = True
		update()

