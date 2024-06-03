<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Call Center Simulation</title>
</head>
<body>
<h1>Call Center Simulation</h1>
<div id="output"></div>
<button onclick="simulateCalls()">Simulate Calls</button>

<script>
class Customer {
    constructor(name, phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
    
    getName() {
        return this.name;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }
}

class Call {
    constructor(customer, issueDescription, priority) {
        this.customer = customer;
        this.issueDescription = issueDescription;
        this.priority = priority;
    }

    getCustomer() {
        return this.customer;
    }

    getIssueDescription() {
        return this.issueDescription;
    }

    getPriority() {
        return this.priority;
    }
}

class Agent {
    constructor(name) {
        this.name = name;
        this.available = true;
    }

    handleCall(call) {
        let outputDiv = document.getElementById("output");
        outputDiv.innerHTML += `Agent ${this.name} is handling a ${call.getPriority()} priority call from ${call.getCustomer().getName()}.<br>`;
        outputDiv.innerHTML += `Issue resolved for customer: ${call.getIssueDescription()}<br>`;
        outputDiv.innerHTML += "Call ended.<br><br>";
        this.available = true;
    }

    isAvailable() {
        return this.available;
    }
}

class CallCenter {
    constructor() {
        this.agents = [];
        this.callsQueue = [];
    }

    addAgent(agent) {
        this.agents.push(agent);
    }

    routeCall(call) {
        if (call.getPriority() === "HIGH") {
            let availableAgent = this.findAvailableAgent();
            if (availableAgent !== null) {
                availableAgent.handleCall(call);
                return;
            }
        }
        let outputDiv = document.getElementById("output");
        outputDiv.innerHTML += "Placing call in the queue.<br>";
        this.callsQueue.push(call);
    }

    findAvailableAgent() {
        for (let agent of this.agents) {
            if (agent.isAvailable()) {
                return agent;
            }
        }
        return null;
    }
}

// Function to simulate calls
function simulateCalls() {
    let callCenter = new CallCenter();

    // Create agents
    let agent1 = new Agent("Agent 1");
    let agent2 = new Agent("Agent 2");
    callCenter.addAgent(agent1);
    callCenter.addAgent(agent2);

    // Simulate incoming calls
    let customer1 = new Customer("John", "1234567890");
    let customer2 = new Customer("Alice", "0987654321");

    let call1 = new Call(customer1, "Internet not working.", "HIGH");
    let call2 = new Call(customer2, "Billing issue.", "MEDIUM");

    // Route calls
    callCenter.routeCall(call1);
    callCenter.routeCall(call2);
}
</script>
</body>
</html>
