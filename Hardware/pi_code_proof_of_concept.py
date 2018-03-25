import requests

url = "http://se329-webagjscripts.ece.iastate.edu:3000/sensor"
payload = {'id': 69, 'status': True}

r = requests.put(url, data=payload)

print(r.status_code)
