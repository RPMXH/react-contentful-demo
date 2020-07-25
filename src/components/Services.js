import React, {Component} from "react";
import {FaBeer, FaCocktail, FaHiking, FaShuttleVan} from "react-icons/all";
import Title from "./Title";

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail/>,
                title: "free cocktails",
                info: "Lorem ipsum 1"
            },
            {
                icon: <FaHiking/>,
                title: "endless hiking",
                info: "Lorem ipsum 1"
            },
            {
                icon: <FaShuttleVan/>,
                title: "free shuttle",
                info: "Lorem ipsum 1"
            },
            {
                icon: <FaBeer/>,
                title: "strongest beer",
                info: "Lorem ipsum 1"
            },
        ]
    }

    render() {
        return (
            <section className="services">
                <Title title="services"/>
                <div className="services-center">
                    {this.state.services.map((item, idx) => {
                        return (
                            <article key={idx} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
