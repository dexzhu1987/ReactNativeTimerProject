import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Constants } from "expo";

const SHORTBREAK = 300;
const PROMODORO = 1500;
const LONGBREAK = 600;
var timer;

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      isOnBreak: props.isOnBreak,
      isStart: props.isStart
    };
  }

  componentDidMount() {
    timer = setInterval(this.incrementCount, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  getAlert(start) {
    if (!start) {
      timer = setInterval(this.incrementCount, 1000);
    } else {
      clearInterval(timer);
    }
  }

  incrementCount = () => {
    if (this.state.count > 0) {
      this.setState(prevState => ({ count: prevState.count - 1 }));
    } else {
      if (this.state.isOnBreak) {
        this.setState({
          count: PROMODORO,
          isOnBreak: !this.state.isOnBreak
        });
      } else {
        this.setState({
          count: SHORTBREAK,
          isOnBreak: !this.state.isOnBreak
        });
      }
      alert("done");
    }
  };

  toMinutes(seconds) {
    var mins = parseInt(seconds / 60);
    var secs = parseInt(seconds % 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    return mins + ":" + secs;
  }

  render() {
    return (
      <Text style={styles.counterText}>{this.toMinutes(this.state.count)}</Text>
    );
  }
}

function SelectButtons({ title, color, background, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={0.5}
    >
      <View>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      howlong: PROMODORO,
      reshow: false,
      isOnBreak: false,
      isStart: true,
      startButtonText: "PAUSE",
      isOnLongBreak: false
    };
    this.child = React.createRef();
  }

  toggleCounter(time, isOnBreak, isOnLongBreak) {
    this.setState({
      howlong: time,
      reshow: true,
      isOnBreak: isOnBreak,
      isStart: true,
      startButtonText: "PAUSE",
      isOnLongBreak: isOnLongBreak
    });
    setTimeout(() => {
      this.setState({
        reshow: false
      });
    }, 1);
  }

  toggleStartPause() {
    this.child.current.getAlert(this.state.isStart);
    this.setState({
      isStart: !this.state.isStart,
      startButtonText: this.state.isStart ? "START" : "PAUSE"
    });
  }

  toggleReset() {
    if (this.state.isOnBreak) {
      if (this.state.isOnLongBreak) {
        this.toggleCounter(LONGBREAK, true, true);
      } else {
        this.toggleCounter(SHORTBREAK, true, false);
      }
    } else {
      this.toggleCounter(PROMODORO, false);
    }
    this.setState({
      isStart: true,
      startButtonText: "PAUSE"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.reshow && (
          <Counter
            count={this.state.howlong}
            isOnBreak={this.state.isOnBreak}
            ref={this.child}
          />
        )}
        <Button
          title={this.state.startButtonText}
          onPress={() => this.toggleStartPause()}
        />
        <View style={styles.buttonsRow}>
          <SelectButtons
            title="PROMODORO"
            color="#ffd11a"
            background="#ffe680"
            onPress={() => this.toggleCounter(PROMODORO, false, false)}
          />
          <SelectButtons
            title="SHORT BREAK"
            color="#ffd11a"
            background="#ffe680"
            onPress={() => this.toggleCounter(SHORTBREAK, true, false)}
          />
          <SelectButtons
            title="LONG BREAK"
            color="#ffd11a"
            background="#ffe680"
            onPress={() => this.toggleCounter(LONGBREAK, true, true)}
          />
          <SelectButtons
            title="RESET"
            color="#ffd11a"
            background="#ffe680"
            onPress={() => this.toggleReset()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  button: {
    width: 168,
    height: 50,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    borderColor: "#cc9900",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  counterText: {
    fontSize: 100
  }
});
