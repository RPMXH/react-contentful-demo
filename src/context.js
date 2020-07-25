import React, {Component} from "react";
//import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'resortRoom',
                order:"sys.createdAt"
                //order:"-sys.createdAt" // reverse order
            })

            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured);
            let maxPrice = Math.max(...rooms.map(room => room.price));
            let maxSize = Math.max(...rooms.map(room => room.size));

            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice: maxPrice,
                maxSize: maxSize,
            })

            console.log(response.items)
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getData();
        // let rooms = this.formatData(items)
        // let featuredRooms = rooms.filter(room => room.featured);
        // let maxPrice = Math.max(...rooms.map(room => room.price));
        // let maxSize = Math.max(...rooms.map(room => room.size));
        //
        // this.setState({
        //     rooms,
        //     featuredRooms,
        //     sortedRooms: rooms,
        //     loading: false,
        //     price: maxPrice,
        //     maxPrice: maxPrice,
        //     maxSize: maxSize,
        // })
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            return {...item.fields, id, images};
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        return tempRooms.find((room) => room.slug === slug);
    }

    handleChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name

        this.setState({
            [name]: value
        }, this.filterRooms);
    }

    filterRooms = () => {
        let {type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;
        let tempRooms = [...this.state.rooms];

        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        if (capacity != 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        tempRooms = tempRooms.filter(room => room.price <= price)

        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        if (breakfast)
            tempRooms = tempRooms.filter(rooms => rooms.breakfast);

        if (pets)
            tempRooms = tempRooms.filter(rooms => rooms.pets);

        this.setState({sortedRooms: tempRooms})
    }

    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}
