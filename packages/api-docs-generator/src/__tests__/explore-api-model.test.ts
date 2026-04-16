import * as path from "node:path";
import { ApiModel } from "@microsoft/api-extractor-model";
import { describe, it } from "vitest";

describe("Explore API Model structure", () => {
  it("should load and explore flicking.api.json", () => {
    const apiModel = new ApiModel();
    const apiJsonPath = path.join(__dirname, "../../api-artifacts/flicking.api.json");

    const apiPackage = apiModel.loadPackage(apiJsonPath);

    console.log("\n=== Package Info ===");
    console.log("Package name:", apiPackage.name);
    console.log("Display name:", apiPackage.displayName);
    console.log("Entry point count:", apiPackage.entryPoints.length);

    const entryPoint = apiPackage.entryPoints[0];
    console.log("\n=== Entry Point ===");
    console.log("Entry point name:", entryPoint.displayName);
    console.log("Member count:", entryPoint.members.length);

    // Group members by kind
    const membersByKind = new Map<string, number>();
    for (const member of entryPoint.members) {
      const kind = member.kind;
      membersByKind.set(kind, (membersByKind.get(kind) || 0) + 1);
    }

    console.log("\n=== Members by Kind ===");
    for (const [kind, count] of membersByKind.entries()) {
      console.log(`${kind}: ${count}`);
    }

    // Explore first class
    const firstClass = entryPoint.members.find(m => m.kind === "Class") as any;
    if (firstClass) {
      console.log(`\n=== First Class: ${firstClass.displayName} ===`);
      console.log("DocComment:", firstClass.tsdocComment?.summarySection);
      console.log("Member count:", firstClass.members?.length || 0);
      console.log(
        "Has constructor:",
        firstClass.members?.some((m: any) => m.kind === "Constructor")
      );
      console.log("Property count:", firstClass.members?.filter((m: any) => m.kind === "Property").length || 0);
      console.log("Method count:", firstClass.members?.filter((m: any) => m.kind === "Method").length || 0);
    }

    // Explore first interface
    const firstInterface = entryPoint.members.find(m => m.kind === "Interface") as any;
    if (firstInterface) {
      console.log(`\n=== First Interface: ${firstInterface.displayName} ===`);
      console.log("DocComment exists:", !!firstInterface.tsdocComment);
      console.log("Member count:", firstInterface.members?.length || 0);
      console.log(
        "PropertySignature count:",
        firstInterface.members?.filter((m: any) => m.kind === "PropertySignature").length || 0
      );
    }

    // Explore first function
    const firstFunction = entryPoint.members.find(m => m.kind === "Function") as any;
    if (firstFunction) {
      console.log(`\n=== First Function: ${firstFunction.displayName} ===`);
      console.log("DocComment exists:", !!firstFunction.tsdocComment);
      console.log("Parameter count:", firstFunction.parameters?.length || 0);
      console.log("Return type:", firstFunction.returnTypeExcerpt?.text);
    }
  });
});
