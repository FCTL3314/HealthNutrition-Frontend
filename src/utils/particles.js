import party from "party-js";

export function confettiFromTop() {
    party.confetti(document.querySelector("#header"), {count: 120});
}