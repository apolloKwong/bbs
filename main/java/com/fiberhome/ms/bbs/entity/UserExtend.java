package com.fiberhome.ms.bbs.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.alibaba.fastjson.annotation.JSONField;
import com.fiberhome.smartms.annotation.Lookup;
import com.fiberhome.smartms.annotation.Org;
import com.fiberhome.smartms.annotation.Org.Type;
import com.fiberhome.smartms.model.LongIdVO;

public class UserExtend extends LongIdVO{
	public String getAcount() {
		return acount;
	}
	public void setAcount(String acount) {
		this.acount = acount;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public short getStatus() {
		return status;
	}
	public void setStatus(short status) {
		this.status = status;
	}
	public String getAddr1() {
		return addr1;
	}
	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}
	public String getAddr2() {
		return addr2;
	}
	public void setAddr2(String addr2) {
		this.addr2 = addr2;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getLanguageCode() {
		return languageCode;
	}
	public void setLanguageCode(String languageCode) {
		this.languageCode = languageCode;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPasswordSalt() {
		return passwordSalt;
	}
	public void setPasswordSalt(String passwordSalt) {
		this.passwordSalt = passwordSalt;
	}
	public Short getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}
	public String getOrginfo() {
		return orginfo;
	}
	public void setOrginfo(String orginfo) {
		this.orginfo = orginfo;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public Date getAccessionTime() {
		return accessionTime;
	}
	public void setAccessionTime(Date accessionTime) {
		this.accessionTime = accessionTime;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public Short getTitle() {
		return title;
	}
	public void setTitle(Short title) {
		this.title = title;
	}
	public String getTenantId() {
		return tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	public Set<String> getRights() {
		return rights;
	}
	public void setRights(Set<String> rights) {
		this.rights = rights;
	}
	public String getUserImage() {
		return userImage;
	}
	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}
	public String getUserMale() {
		return userMale;
	}
	public void setUserMale(String userMale) {
		this.userMale = userMale;
	}
	public String getUserDescription() {
		return userDescription;
	}
	public void setUserDescription(String userDescription) {
		this.userDescription = userDescription;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	private static final long serialVersionUID = 1757475622243875292L;
	private String acount;
	private String email;
	private String firstname;
	private String lastname;
	@Lookup(type = "STATUS")
	private short status;
	private String addr1;
	private String addr2;
	private String city;
	private String state;
	private String zip;
	private String country;
	private String phone;
	@Lookup(type = "LANGUAGE")
	private String languageCode;
	@JSONField(serialize = false)
	protected String password;
	@JSONField(serialize = false)
	protected String passwordSalt;
	@JSONField(serialize = false)
	private Short delFlag;
	@Org(Type.CODE)
	private String orginfo;
	protected String mobile;
	protected String fax;
	protected String address;
	protected String photo;
	@JSONField(serialize = false)
	protected Date accessionTime;
	protected String education;
	protected Short title;
	@JSONField(serialize = false)
	protected String tenantId;
	private Set<String> rights = new HashSet();
    private String userImage;
    private String  userMale;
    private String userDescription;
    private long userId;
    
}
