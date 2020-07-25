package com.fiberhome.ms.bbs.utils;

public class commandTool {
  //造词机
  /*["fieldName:1",
   "resourceType:1 OR resourceType:2"],*/
  public static String resourceTypeFilterQueryMaker(String resourceType2) {
    String[] resourceType = resourceType2.split(",");
    if(resourceType[0].equals("0")) {
        return "";
    } else {
        String r= "resourceType:"+resourceType[0];
        if(resourceType.length >1) {
          for (int i = 1; i < resourceType.length; i++) {
              r = r+" OR resourceType:"+resourceType[i];
          }
        }
        return r;
    }
  }
  public static String fieldFilterQueryMaker(String field2) {
    String[] field = field2.split(",");
    if(field[0].equals("0")) {
        return "";
    }
    else {
        String r= "fieldName:"+field[0];
        if(field.length >1) {
          for (int i = 1; i < field.length; i++) {
              r = r+" OR fieldName:"+field[i];
          }
        }
        return r;
    }
  }
}
