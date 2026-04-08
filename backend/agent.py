import os
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], "The messages in the conversation"]
    brief_data: dict
    ad_variants: list

# Initialize LLM
llm = ChatOpenAI(model="gpt-4", temperature=0.7)

# Node: Parse Brief
def parse_brief(state: AgentState):
    print("Parsing brief...")
    # Mock logic - in reality, would use LLM to extract data
    return {"brief_data": {"extracted": True}, "messages": state["messages"]}

# Node: Generate Ads
def generate_ads(state: AgentState):
    print("Generating ad variants...")
    prompt = f"Create 3 ad variants for: {state['messages'][0].content}"
    response = llm.invoke([HumanMessage(content=prompt)])
    # Mock variants
    variants = [
        {"id": 1, "copy": "Variant 1: Revolutionize yours!", "image": "url1"},
        {"id": 2, "copy": "Variant 2: Try it today.", "image": "url2"},
        {"id": 3, "copy": "Variant 3: The best solution.", "image": "url3"}
    ]
    return {"ad_variants": variants}

# Node: QA Review
def qa_review(state: AgentState):
    print("Performing QA Review...")
    # Require human intervention for MVP
    return state

# Setup Graph
workflow = StateGraph(AgentState)
workflow.add_node("parse", parse_brief)
workflow.add_node("generate", generate_ads)
workflow.add_node("qa", qa_review)

workflow.set_entry_point("parse")
workflow.add_edge("parse", "generate")
workflow.add_edge("generate", "qa")
workflow.add_edge("qa", END)

app_workflow = workflow.compile()
