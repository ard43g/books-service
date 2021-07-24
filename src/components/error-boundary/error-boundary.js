import { Component } from "react";
import Modal from "../modal/modal";

export default class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    componentDidCatch() {
        console.log("catch");
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <Modal message="Что-то пошло не так..." critical />;
        }
        return this.props.children;
    }
}
