/*
 * Model classes for parking spots and parking lots.
 */


class parkingSpot {
    constructor(sensorID) {
        this.sensorID = sensorID;
        this.occupied = false;

    };

    parkCar() {
        this.occupied = true;
    }

    unparkCar() {
        this.occupied = false;
    }

    getID() {
        return this.sensorID;
    }
}

class parkingLot {
    constructor(lotID) {
        this.lotID = lotID;
        this.sensors = [];
    };

    getID() {
        return this.lotID;
    }

    addSpot(spot) {
        this.sensors[this.sensors.length] = spot;
    }
}